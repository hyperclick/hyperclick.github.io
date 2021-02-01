window.addEventListener("load", () => {
    db = {}
    const d = new Date()
    const key = "quiz_" + d.toISOString()
    const get_game_key = () => { return key }
    const data = { events: [] }
    console.log("data.events: " + data.events.length)
    db.mode = "record"
        // db.save_game_start = (data) => { localStorage.setItem(data.key, data) }
        // db.get = (key) => { return localStorage.getItem(key) }
    db.log_event = (e) => {
        data.events.push(e)
        localStorage.setItem(key, JSON.stringify(data))
        console.log(`event ${e.type} saved to ${key}`)
    }

    db.read_all_games = () => {
        const keys = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("quiz_")) { keys.push(key) }
        }
        return keys
    }
    db.getGame = (key) => JSON.parse(localStorage.getItem(key))
    db.removeGame = (key) => localStorage.removeItem(key)


    if (typeof questions === typeof undefined) {
        console.warn("questions were not loaded")
    } else {
        const index = Math.round(Math.random() * 3669)
        const qa = questions[index]
        db.get_word = () => { return qa[1] }
        db.get_question = () => { return qa[0] }
    }


    db.getSettings = () => {
        return JSON.parse(localStorage.getItem("settings_quiz"))
    }

    db.applySettings = () => {
        s = db.getSettings()
            // const rule = "body{background-color:" + s.bg_color + "}"
            // const css = document.styleSheets[0]
            // document.styleSheets[0].insertRule('article { line-height: 1.5; font-size: 1.5em; }', css.cssRules.length);
            // css.insertRule(rule, css.cssRules.length);
            // const buttons = document.querySelectorAll(".button")
            // for (let i = 0; i < buttons.length; i++) {
            //     const b = buttons[i];
            //     b.style.backgroundColor = s.button_color
            // }
        const body = document.getElementsByTagName("body")[0].style.backgroundColor = s.bg_color
    }

    db.saveSettings = s => {
        localStorage.setItem("settings_quiz", JSON.stringify(s))
        db.applySettings()
    }

    const createDefaultSettings = () => {
            s = {}
            s.bg_color = "#ffffff"
            return s
        }
        // db.saveSettings(createDefaultSettings())
    if (db.getSettings() === null) {
        db.saveSettings(createDefaultSettings())
    } else {
        db.applySettings()
    }

    window.db = db


})