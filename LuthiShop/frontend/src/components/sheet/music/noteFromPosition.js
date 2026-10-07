const trebleNotes = [
    "f/5",
    "e/5",
    "d/5",
    "c/5",
    "b/4",
    "a/4",
    "g/4",
    "f/4",
    "e/4"
]

export function getNoteFromY(y, stave) {
    const topLine = stave.getYForLine(0)
    const lineSpacing = stave.getSpacingBetweenLines()

    const position =
        Math.round(
            (y - topLine) /
            (lineSpacing / 2)
        )

    const index = 8 - position

    if (index < 0 || index >= trebleNotes.length) {
        return null
    }
    alert("clicou")
    return trebleNotes[index]
}
