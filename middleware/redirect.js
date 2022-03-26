export default function ({ $auth, redirect  }) {
    // setTimeout(() => {
        if (!$auth.loggedIn) {
            return redirect(process.env.AUTH_URL);
        }
    // }, 3000);
}
