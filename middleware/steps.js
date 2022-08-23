export default function ({redirect, $auth}) {
    if ($auth.user?.profile?.isPerson == true && $auth.user?.profile?.person?.inn == null || $auth.user?.phone == null) {
        return redirect(process.env.HUB_URL);
    }

    if ($auth.user?.profile?.isPerson == false && $auth.user?.name == null || $auth.user?.phone == null) {
        return redirect(process.env.HUB_URL);
    }
}
