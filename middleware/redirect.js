export default function ({ $auth, route, error, redirect  }) {
    if (!$auth.loggedIn) {
        return redirect(process.env.AUTH_URL);
    }
}
