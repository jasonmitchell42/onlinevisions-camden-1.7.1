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
        // remove other categories from menu
        var leftMenuCategories = this.context.leftMenuCategories.split(',');
        jQuery('.navPages .navPages-list .navPages-item > .navPages-action').each(function() {
            if (!$(this).hasClass('multi-sku-link')) {
                var title = $(this).text().trim();
                if (!leftMenuCategories.includes(title)) {
                    $(this).closest('.navPages-item').remove();
                }
            }
        });
        jQuery('.navPages').removeClass('loading');
        // END remove other categories from menu

        //Start collapse the links into an accordion / collapsible -> footer
        jQuery('.footer .footer-info-heading').on('click', function() {
            if($(this).next().hasClass('footer-info-list') && $(window).width() <= 800) {
                $(this).toggleClass('active');
                $(this).next().slideToggle(0);
            }
        });

        jQuery(document).on('click','.footer [data-content-region="footer-newsletter-content--global"] strong', function() {
            if ($(window).width() <= 800) {
                if (!$(this).parent().hasClass('active')) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }
            }
        });

        //End collapse the links into an accordion / collapsible -> footer
        //start alignHeight category list homepage
        function alignHeight(selector) {
            jQuery(selector).css('height', '');
            var minHeight = 0;
            jQuery(selector).each(function () {
                if (minHeight < jQuery(this).outerHeight()) {
                    minHeight = jQuery(this).outerHeight();
                }
            });
            if (minHeight > 0) {
                jQuery(selector).css('height', minHeight);
            }
        }
        setTimeout(() => {
            alignHeight('[data-content-region="home_browse_by_categories"] [data-sub-layout-container]:not(:first-child) span a');
        },200);
        $(window).on('resize', function() {
            setTimeout(() => {
                alignHeight('[data-content-region="home_browse_by_categories"] [data-sub-layout-container]:not(:first-child) span a');
            },200);
        })
        //end alignHeight category list homepage
    }
}
