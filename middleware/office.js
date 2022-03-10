export default function ({ $auth, route, error, redirect  }) {
    if (!$auth.loggedIn || $auth.user.role !== 'admin') {
        return redirect(process.env.OFFICE_URL + '/auth/sign-in');
    }
}
