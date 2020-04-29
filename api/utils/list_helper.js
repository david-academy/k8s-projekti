const dummy = (blogs)=>{
return 1
}

const totalLikes = (blogs)=>{
    const reducer = (sum, item)=> sum + item.likes
    return blogs.length === 0
            ? 0
            : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs)=>{
    const reducer = (prev, current) => prev === null
            ? current
            : (prev.likes > current.likes)
                ? prev
                : current
    const favorite = blogs.length === 0
            ? null
            : blogs.reduce(reducer, null)

    if (favorite !== null){
        const returnedObject = {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
        return returnedObject
    } else {
        return null
    }
}


module.exports={
    dummy,
    totalLikes,
    favoriteBlog
}