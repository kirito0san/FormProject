const btn_next = document.querySelector(".next");
const btn_signIn = document.querySelector(".sign-in");
const btn_signUp = document.querySelector(".sign-up");
btn_next.addEventListener("click", () => {
    document.querySelector(".hidden_h2").classList.add("show_h2");
    btn_signIn.classList.add("show-sign-in");
    btn_signUp.classList.add("show-sign-up");
    btn_next.classList.add("next-hidden");
});
const inputMaker = () => {
    const form = document.createElement("form");
    for (let index = 0; index < 4; index++) {
        const div = document.createElement("div");
        div.classList.add("parent_input");
        const input = document.createElement("input");
        const label = document.createElement("label");
        if (index === 0) {
            label.setAttribute("for", "nameOfPreson");
            label.append("name");
            input.setAttribute("id", "nameOfPreson");
            input.type = "text";
        } else if (index === 1) {
            label.setAttribute("for", "gmailOfPreson");
            input.setAttribute("id", "gmailOfPreson");
            input.type = "text";
            label.append("gmail");
        } else if (index === 2) {
            label.setAttribute("for", "passwordOfPreson");
            input.setAttribute("id", "passwordOfPreson");
            input.type = "password";
            label.append("password");
        } else if (index === 3) {
            label.setAttribute("for", "confirmPasswordOfPreson");
            input.setAttribute("id", "confirmPasswordOfPreson");
            input.type = "password";
            label.append("confirm password");
        }
        div.append(label);
        div.append(input);
        form.append(div);
    }
    document.querySelector(".parent-h2").replaceChildren(form);
};
const paragraphMaker = (name, gmail, password) => {
    const div = document.createElement("div");
    div.setAttribute("class", "paragraph-maker");
    for (let index = 0; index < 4; index++) {
        const paragraph = document.createElement("p");
        const span = document.createElement("span");
        if (index === 0) {
            paragraph.append(`your name is `);
            span.append(name);
            paragraph.append(span);
        } else if (index === 1) {
            paragraph.append(`your gmail is `);
            span.append(gmail);
            paragraph.append(span);
        } else if (index === 2) {
            paragraph.append(`your password is `);
            span.append(password);
            paragraph.append(span);
        } else if (index === 3) {
            paragraph.append("your account is created successfully");
        }
        div.append(paragraph);
    }
    document.querySelector(".parent-h2").replaceChildren(div);
};
let stage = 0;
const mainFunLogStage = () => {
    console.log(stage, "from main");
    if (stage === 0) {
        inputMaker();
        btn_signUp.replaceChildren("continue");
        ++stage;
    } else if (stage === 1) {
        let name = document.getElementById("nameOfPreson").value;
        let gmail = document.getElementById("gmailOfPreson").value;
        let password = document.getElementById("passwordOfPreson").value;
        let confirmPassword = document.getElementById("confirmPasswordOfPreson").value;
        if (!name || !gmail || !password || !confirmPassword || password !== confirmPassword) return;
        localStorage.setItem("name", name);
        localStorage.setItem("gmail", gmail);
        localStorage.setItem("password", password);
        paragraphMaker(name, gmail, password, confirmPassword);
        btn_signUp.replaceChildren("go login");
        stage++;
    } else if (stage === 2) {
        inputLogin();
        let gmail = document.getElementById("gmailOfPreson").value;
        let password = document.getElementById("passwordOfPreson").value;
        if (gmail !== localStorage.getItem("gmail") || password !== localStorage.getItem("password"))
            stage++;
    } else if (stage === 3) {
        let gmail = document.getElementById("gmailOfPreson").value;
        let password = document.getElementById("passwordOfPreson").value;
        if (gmail !== localStorage.getItem("gmail") || password !== localStorage.getItem("password"))
            return;
        loginMaker();
        btn_signUp.classList.remove("show-sign-up")
        btn_signIn.classList.remove("show-sign-in")
    }
};
const loginMaker = () => {
    btn_signUp.classList.remove("show-sign-in");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    span.setAttribute("class", "loader");
    h2.append(`hello ${localStorage.getItem("name")}`);
    document.querySelector(".parent-h2").replaceChildren(span);
    setTimeout(() => {
        document.querySelector(".parent-h2").replaceChildren(h2);
    }, 2000);
};
const inputLogin = () => {
    const form = document.createElement("form");
    for (let index = 0; index < 2; index++) {
        const div = document.createElement("div");
        div.classList.add("parent_input");
        const input = document.createElement("input");
        const label = document.createElement("label");
        if (index === 0) {
            label.setAttribute("for", "gmailOfPreson");
            input.setAttribute("id", "gmailOfPreson");
            input.type = "text";
            label.append("gmail");
        } else if (index === 1) {
            label.setAttribute("for", "passwordOfPreson");
            input.setAttribute("id", "passwordOfPreson");
            input.type = "password";
            label.append("password");
        }
        div.append(label);
        div.append(input);
        form.append(div);
    }
    btn_signUp.replaceChildren("continue");
    document.querySelector(".parent-h2").replaceChildren(form);
};
btn_signUp.addEventListener("click", () => {
    btn_signIn.replaceChildren("back to sign in ");
    if (stage === 10) {
        stage = 3
    }
    mainFunLogStage();
});
let toggleLogOrSin = false
btn_signIn.addEventListener("click", () => {
    console.log(stage)
    if (toggleLogOrSin) {
        inputMaker()
        btn_signIn.classList.remove("show-sign-up");
        btn_signIn.replaceChildren("Back to signIn");
        stage = 1
        toggleLogOrSin = false
    } else {
        inputLogin();
        btn_signIn.replaceChildren("Back to signUp");
        stage = 3
        toggleLogOrSin = true
    }
});
