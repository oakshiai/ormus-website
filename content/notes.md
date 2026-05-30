# Getting Started

Scrollback and prompt focus switch with `Enter` or `tab` works but then when in Scrollback the `j/k` and `h/l` key immediatelly re-focus prompt and count as letter input instead of the documented behavior. Arrow keys seem to work instead. Turns out this is because there are two input modes "Simple mode" and "Vim mode" and these keys only do stuff in "Vim mode".