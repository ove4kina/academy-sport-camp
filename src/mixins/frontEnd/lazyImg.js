export const lazyImg = {
    methods: {
        lazyImg(src,callback) {
            let imgP = new Image();
            imgP.src = src;
            imgP.onload = callback();
        }
    }
};

