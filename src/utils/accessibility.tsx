export default function handleKeyDown(
  event: React.KeyboardEvent,
  handler: () => void
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handler();
  }
}

