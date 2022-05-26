export default function ({ $auth, redirect  }) {
    if (!$auth.loggedIn) {
        $auth.fetchUser().then(() => {
            if (!$auth.loggedIn) {
                return redirect(process.env.OFFICE_URL + '/auth/sign-in');
            }
        });
    }
    if($auth.loggedIn && $auth.user.role !== 'admin') {
        return redirect(process.env.OFFICE_URL + '/auth/sign-in');
    }
}
