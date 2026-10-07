export type StatefulButtonState = "idle" | "pending" | "success" | "error"

export function nextState(
  state: StatefulButtonState,
  event: "submit" | "resolve" | "reject",
): StatefulButtonState {
  if (event === "submit" && state === "idle") return "pending"
  if (event === "resolve" && state === "pending") return "success"
  if (event === "reject" && state === "pending") return "error"
  return state
}
