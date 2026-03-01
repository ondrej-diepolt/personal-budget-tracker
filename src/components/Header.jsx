function Header() {
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