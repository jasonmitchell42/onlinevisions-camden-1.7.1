import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import quickAddSkus from './f/quick-add-sku';
import accountMenu from './f/account-menu';
import autoHighlight from './f/auto-highlight';
import cardAddToCart from './f/card-add-to-cart';

export default class Global extends PageManager {
    onReady() {
        cartPreview(this.context.secureBaseUrl, this.context.cartId, this.context.disableMinicart, this.context.enableSideCart);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        quickAddSkus();
        autoHighlight();
        cardAddToCart();
        svgInjector();
        accountMenu();

        if (window.ApplePaySession) {
            $('.apple-pay-checkout-button').show();
        }
    }
}
