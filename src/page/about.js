
function About() {
    return (
        <div className={document.getElementById('react-switch-new').checked===false?"about":"aboutDark"}>
            <h1>О сайте</h1>
            <ul>
                <li><p>SPA приложение: новости о космических полетах</p></li>
                <li><p>Framework: React</p></li>
                <li><p>Работа выполена: Курлычкиным Артемом Андреевичем</p></li>
                <li><p>Группа: РПИС-92</p></li>
            </ul>
        </div>
    )
}

export default About;