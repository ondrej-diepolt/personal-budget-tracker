// Application header — displays the app title and the current page-load date.
function Header() {
    // Current date formatted as e.g. "29 May 2026" — shown in the top-right of the header.
    const now = new Date();
    const month = now.toLocaleString('en-US', {day : '2-digit',month: 'long', year: 'numeric' })

    return (
        <header>

            <h1>Finance Tracker</h1>
            <span>{month}</span>

        </header>
    )
}

export default Header