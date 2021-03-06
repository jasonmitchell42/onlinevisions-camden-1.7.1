import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import cardAddToCart from './f/card-add-to-cart';
import sideCart from './f/side-cart';
import Url from 'url';
import gridSwitcher from './f/grid-list-switcher';

export default class Category extends CatalogPage {
    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        if (this.context.enableSideCart) {
            sideCart();
        }

        cardAddToCart();

        gridSwitcher(this.context);

        this.highlightPageCount();
    }

    highlightPageCount() {
        const url = Url.parse(window.location.href, true);
        if (url.query.limit) {
            $(`.productCount [data-count=${url.query.limit}]`).addClass('productCount__item--active');
        } else if (this.context.categoryProductsPerPage) {
            $(`.productCount [data-count=${this.context.categoryProductsPerPage}]`).addClass('productCount__item--active');
        }
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const $headerTitleContainer = $('#headerTitleContainer');
        const $itemsPerPageCounter = $('.js-product-count');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'f/category/product-listing',
                sidebar: 'category/sidebar',
                headerTitle: 'f/category/header-title-onlinevisions',
                itemsPerPage: 'f/category/show-amount',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
            $headerTitleContainer.html(content.headerTitle);
            $itemsPerPageCounter.html(content.itemsPerPage);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            if (this.context.enableSideCart) {
                sideCart();
            }

            cardAddToCart();

            gridSwitcher(this.context);

            this.highlightPageCount();
        });
    }
}
