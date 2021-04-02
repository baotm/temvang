export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('formatSoVang', x => {
        if (x == 0 || x == null || x == undefined) {
            return 0;
        }
        let x1 = String(x)
        if (x >= 1000) {
            return x1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "c");
        } else if (100 <= x < 1000) {
            return x1.toString().replace(/\B(?=(\d{2})+(?!\d))/g, "p");
        }
    });
    inject('formatSoTien', x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

}