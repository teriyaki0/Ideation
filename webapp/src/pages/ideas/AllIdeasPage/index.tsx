import InfiniteScroll from "react-infinite-scroller";
import { Alert } from "../../../components/Alert";
import { Idea } from "../../../components/Idea";
import { layoutContentRef } from "../../../components/Layout";
import { Loader } from "../../../components/Loader";
import { trpc } from "../../../lib/trpc";
import styles from "./index.module.scss";

export const AllIdeasPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = trpc.getIdeas.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <>
      {isLoading || isRefetching ? (
        <Loader type="page" />
      ) : isError ? (
        <Alert mode="error">{error.message}</Alert>
      ) : (
        <div className={styles.ideas}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                setTimeout(() => {
                  void fetchNextPage();
                }, 2000);
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="section" key="loader" />}
            getScrollParent={() => layoutContentRef.current}
            useWindow={
              (layoutContentRef.current &&
                getComputedStyle(layoutContentRef.current).overflow) !== "auto"
            }
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <Idea
                  key={idea.nick}
                  name={idea.name}
                  nick={idea.nick}
                  description={idea.description}
                  createdAt={idea.createdAt}
                />
              ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
