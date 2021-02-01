window.addEventListener("load", () => {
    const games_tag = document.getElementById("games")
    const refillGames = () => {
        len = games_tag.children.length
        for (let i = 0; i < len; i++) {
            const c = games_tag.children[0];
            games_tag.removeChild(c)
                //            console.log(i + " removed: " + c.value)
        }
        const games = db.read_all_games()
        games.forEach(key => {
            const option_tag = document.createElement("option")
            option_tag.innerHTML = key
            option_tag.setAttribute("value", key)
            games_tag.appendChild(option_tag)
        });
        games_tag.setAttribute("size", 20)
    }
    games_tag.addEventListener("change", (e) => {
        refillGameData(e.target.value)
    })
    refillGames()

    const refillGameData = (key) => {

        const fillGameData = (data) => {
            data.events.forEach(e => {
                const row = document.createElement("tr")
                let cell = document.createElement("td")
                cell.innerHTML = e.type
                row.appendChild(cell)
                cell = document.createElement("td")
                cell.innerHTML = JSON.stringify(e.data)
                row.appendChild(cell)
                table_tag.appendChild(row)
            });
        }
        const table_tag = document.getElementById("events")
        const len = table_tag.children.length
        for (let i = 1; i < len; i++) {
            table_tag.removeChild(table_tag.children[1])
        }
        try {
            fillGameData(db.getGame(key))
        } catch (error) {
            console.error(error)
            const row = document.createElement("tr")
            let cell = document.createElement("td")
            cell.innerHTML = "invalid data"
            row.appendChild(cell)
            table_tag.appendChild(row)

        }

    }

    const delete_button = document.getElementById("delete_button")
    delete_button.onclick = (e) => {
        if (games_tag.value) {
            db.removeGame(games_tag.value)
            refillGames()
        }
    }
    const delete_all_button = document.getElementById("delete_all_button")
    delete_all_button.onclick = (e) => {
        for (let i = 0; i < games_tag.children.length; i++) {
            const option = games_tag.children[i];
            db.removeGame(option.value)
        }
        refillGames()
    }


    const init_settings = () => {
        const bg_color_input = document.getElementById("bg_color_input")
        settings = db.getSettings()
        bg_color_input.value = settings.bg_color
        bg_color_input.onchange = () => {
            settings.bg_color = bg_color_input.value
            db.saveSettings(settings)
        }
    }

    init_settings()

})