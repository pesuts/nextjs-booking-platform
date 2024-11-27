export default function toastConfig(
  severity:
    | "success"
    | "info"
    | "warn"
    | "error"
    | "secondary"
    | "contrast"
    | undefined = "success",
  summary: string = "Success!",
  detail?: string,
  style: object = {
    backgroundColor: "#2c3e50",
    color: "white",
    borderRadius: "10px",
    fontSize: "14px",
  }
) {
  return {
    severity,
    summary,
    detail,
    life: 4000,
    style,
  };
}
