export default function ({ $auth, redirect  }) {
    // setTimeout(() => {
        if (!$auth.loggedIn || $auth.user.role !== 'admin') {
            return redirect(process.env.OFFICE_URL + '/auth/sign-in');
        }
    // }, 0);
}
