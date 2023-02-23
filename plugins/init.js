export default async ({store}) => {
    store.dispatch('users/getCurrentAccount').then(() => {
        let currentUser = store.getters['users/currentAccount'];
        store.dispatch('currentPerson/addPerson', {person: currentUser?.profile?.isPerson});
    });
};
