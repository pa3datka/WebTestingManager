export const hideOnClickMenu = () => {

    const hideMenu = (container: string, list: string, classShow: string, callback: any): void => {
        const menuList = document.querySelector('.' + list);
        menuList && window.addEventListener('click', (e) => {
            if (menuList.classList.contains(classShow)) {
                !e.composedPath().includes(<EventTarget>document.querySelector('.' + container)) && callback();
            }
        });
    };

    const hideUserMenu = (btnUser: string, list: string, classShow: string, callback: any): void => {
        const menuList = document.querySelector('.' + list);
        menuList && window.addEventListener('click', (e) => {
            if (menuList.classList.contains(classShow)) {
                !e.composedPath().includes(<EventTarget> document.querySelector('.' + list))
                && !e.composedPath().includes(<EventTarget> document.querySelector('.' + btnUser))
                && callback();
            }
        });
    };

    const showDrawer = () => {
        const btnDrawer = document.querySelector('.mobile-menu-burger');
        btnDrawer && btnDrawer.addEventListener('click', () => {
            if (!btnDrawer.classList.contains('active-burger')) {
                btnDrawer.classList.add('active-burger');
                let drawerMenu = document.querySelector('.drawer-container');
                drawerMenu && drawerMenu.classList.add('active-drawer');
            }
        });
    };

    const hideDrawer = () => {
        const burger = document.querySelector('.mobile-menu-burger');
        const drawer = document.querySelector('.drawer-container');

        burger && drawer && window.addEventListener('click', (e) => {
            if (burger.classList.contains('active-burger')
                && drawer.classList.contains('active-drawer')
                && !e.composedPath().includes(<EventTarget>document.querySelector('.mobile-menu-burger'))
                && !e.composedPath().includes(<EventTarget>document.querySelector('.drawer-wrap'))
            ) {
                burger.classList.remove('active-burger');
                drawer.classList.remove('active-drawer');
            }
        });
    };

    const hideDrawerForcibly = () => {
        document.querySelector('.drawer-container')?.classList.remove('active-drawer');
        document.querySelector('.mobile-menu-burger')?.classList.remove('active-burger');
    };

    return { hideMenu, hideUserMenu, showDrawer, hideDrawer, hideDrawerForcibly };
}