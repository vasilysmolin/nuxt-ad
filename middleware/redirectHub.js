export default function ({ $auth, redirect  }) {
        if ($auth.loggedIn) {
             $auth.fetchUser().then(() => {
                if ($auth.loggedIn) {
                    return redirect(process.env.HUB_URL + '/profile');
                }
            });
        }
}