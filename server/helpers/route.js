exports.tryJson = async (res, func, ...args) => {
    try {
        const data = await func(...args)
        res.json({
            ok: true,
            data: data
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error
        })
    }
}