import { ErrorPageComponent } from "../../../components/ErrorPageComponent";

export const NotFoundPage = ({
  title = "Not Found",
  message = "Page not found",
}: {
  title?: string;
  message?: string;
}) => <ErrorPageComponent title={title} message={message} />;
