import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { csrf } from "hono/csrf";
import { jwt } from "hono/jwt";
import { renderer } from "./components/renderer";
import { Card } from "./components/ui/card";

//routes
import { Login, loginValidator } from "./routes/login";
import { loginAuth } from "./routes/loginAuth";
import { adminTop } from "./routes/adminTop";
import { adminNew, newValidator } from "./routes/adminNew";
import { adminEdit, editValidator } from "./routes/adminEdit";
import { adminDelete, deleteValidator } from "./routes/adminDelete";
import { adminUpdate, updateValidator } from "./routes/adminUpdate";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer);
app.use("/admin/*", async (c, next) => {
	const token = getCookie(c, "token");
	if (!token) {
		return c.redirect("/404");
	}

	const jwtMiddleware = jwt({
		secret: c.env.JWT_SECRET,
		cookie: "token",
	});
	return jwtMiddleware(c, next);
});

app.get("/", (c) => {
	return c.redirect("/404");
});

app.get("/login", csrf(), loginValidator, (c) => Login(c));
app.post("/login/auth", csrf(), loginValidator, loginAuth);
app.get("/admin", (c) => adminTop(c));
app.post("/admin/update", csrf(), updateValidator, (c) => adminUpdate(c));
app.post("/admin/delete", csrf(), deleteValidator, (c) => adminDelete(c));
app.post("/admin/new", csrf(), newValidator, (c) => adminNew(c));
app.post("/admin/edit", csrf(), editValidator, (c) => adminEdit(c));
app.get("/404", (c) => c.text("404 Not Found", 404));
export default app;
