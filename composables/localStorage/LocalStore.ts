export const localStore = () => {

    const getDashboardMenuState = (): boolean => {
        return Boolean(Number(localStorage.getItem('dashboard_menu_state') ?? 0));
    }

    const setDashboardMenuState = (state: boolean): void => {
        localStorage.setItem('dashboard_menu_state', `${Number(state)}`);
    };

    return { getDashboardMenuState, setDashboardMenuState };
};