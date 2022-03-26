export default function ({ route, redirect, $auth  }) {
    let user = $auth.user;
    if(user != null && user.profile != null) {
        if(user.profile.isPerson === true && route.name.includes('resume')) {
            return redirect(process.env.HUB_URL + '/profile');
        }
        if(user.profile.isPerson === false && route.name.includes('vacancies')) {
            return redirect(process.env.HUB_URL + '/profile');
        }
    }
}
