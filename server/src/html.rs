
// Define the static HTML as a constant
pub static INDEX_HTML: &str = r#"<!DOCTYPE html>
<html>
    <head>
        <title>Oapi Todos</title>
    </head>
    <body>
        <ul>
        <li><a href="scalar" target="_blank">scalar</a></li>
        </ul>
    </body>
</html>
"#;

pub static LOGIN_HTML: &str = r#"<!DOCTYPE html>
<html>
    <head>
        <title>JWT Auth Demo</title>
    </head>
    <body>
        <h1>JWT Auth</h1>
        <form action="/" method="post">
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" required>

        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required>

        <button type="submit">Login</button>
    </form>
    </body>
</html>
"#;