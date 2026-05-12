export function toggleLike(productId: number) {

    // likes arr kontrol edilir, eğer productId varsa kaldırılır, yoksa eklenir
    const likes = JSON.parse(localStorage.getItem('likes') || '[]') as number[];
    if (likes.includes(productId)) { // dizi içinde var mı?
        const index = likes.indexOf(productId); // index bulunur
        likes.splice(index, 1); // index'ten itibaren 1 eleman silinir
    } else {
        likes.push(productId); // yoksa eklenir
    }
    localStorage.setItem('likes', JSON.stringify(likes)); // güncellenmiş likes dizisi localStorage'a kaydedilir
}

export function isLiked(productId: number): boolean {
    const likes = JSON.parse(localStorage.getItem('likes') || '[]') as number[];
    return likes.includes(productId); // productId'nin likes dizisinde olup olmadığı kontrol edilir
}

export function getLikedProducts(): number[] {
    return JSON.parse(localStorage.getItem('likes') || '[]') as number[]; // localStorage'dan likes dizisi alınır ve döndürülür
}
