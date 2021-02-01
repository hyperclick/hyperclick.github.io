window.addEventListener("load", () => {
    const admin_button = document.querySelector(".admin.button")
        //admin_button.onclick = () => {document.}

    const word_tag = document.getElementById("word")
    const letter_tags = []
    const display_word = (word) => {
        for (const letter of word) {
            const letter_tag = document.createElement("div")
            letter_tag.className = "letter"
            if (letter === " ") letter_tag.className += " space";
            letter_tag.innerHTML = letter
            word_tag.append(letter_tag)
            letter_tags.push(letter_tag)
        }
    }
    const question_tag = document.getElementById("question")
    display_question = (question) => {
        question_tag.innerHTML = question
    }

    const game_over = (class_name) => {
        clearInterval(timer_id)
        const game_over_tag = document.getElementById("game_over")
        game_over_tag.style.display = "block"
        const tags = document.getElementsByClassName(class_name)
        for (let i = 0; i < tags.length; i++) {
            const t = tags[i];
            t.style.display = "block"

        }
        const notification_tag = game_over_tag.querySelector("." + class_name + ".result")
            //notification_tag.classList.add("animation")
        setTimeout(() => { notification_tag.classList.add("animation") }, 0)

    }

    all_letters_openned = () => {
        const all = word_tag.childElementCount
        const open = word_tag.getElementsByClassName("open").length
        return (all === open)
    }
    check_game_over = () => {
        if (get_score() <= 0) {
            //set_score(0)
            score = 0
            display_score()
            game_over("loose")
        }
        if (all_letters_openned()) {
            game_over("win")
        }
    }

    check_letter = (key_tag, letter) => {
        db.log_event({ type: "click", data: letter })
        let found = false
        for (let i = 0; i < letter_tags.length; i++) {
            const tag = letter_tags[i];
            if (tag.innerHTML === letter) {
                tag.className += " open"
                inc_score()
                found = true
            }
        }
        p = key_tag.parentElement
        p.removeChild(key_tag)
        if (!found) {
            dec_score()
        }
        db.log_event({ type: "score", data: score })
    }
    display_keyboard = () => {
        const keyboard = document.getElementById("keyboard")
        for (let i = 0; i < 32; i++) {
            const a = 'а'.charCodeAt(0)
            const letter = String.fromCharCode(a + i)
            const letter_tag = document.createElement("div")
            letter_tag.className = "letter key button"
            letter_tag.innerHTML = letter
            letter_tag.addEventListener("click", (e) => check_letter(e.target, letter))
            keyboard.append(letter_tag)
        }
    }

    let score = 0
    get_score = () => {
        return score;
    }
    set_score = (new_score) => {
        score = new_score
            // db.log_event({ type: "score", data: score })
        display_score(get_score())
        check_game_over()
    }
    inc_score = () => {
        set_score(score + 1)
    }
    dec_score = () => {
        set_score(score - 1)
    }

    const score_tag = document.getElementById("score")
    display_score = () => {
        score_tag.innerHTML = score.toFixed(2)
    }

    const next_word_tag = document.getElementsByClassName("next_word")[0]
    next_word_tag.addEventListener("click", () => {
        db.log_event({ type: "click", data: "next_word" })
        document.location.reload();
    })



    display_word(db.get_word())
    display_question(db.get_question())

    display_keyboard()
    set_score(db.get_word().length)

    db.log_event({ type: "game_start", data: { question: db.get_question(), answer: db.get_word() } })

    const time_passed = () => {
        set_score(get_score() - 0.001)
            //if(get_score()<0){clearInterval(timer_id)}
    }
    const timer_id = setInterval(time_passed, 100)

})