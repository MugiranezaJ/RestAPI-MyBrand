import swaggerjsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export function documentiation(app) {
    //Extended:https://swagger.io/specification/#infoObject
    const swaggerOptions = {
        swaggerDefinition: {
            info:{
                title:"mjackson Api",
                descriptio: "documentation for mjackson Api",
                contact:{
                    name:"MJackson"
                },
                servers:["http://127.0.0.1:3000/api/"]
            }
        },
        apis: ['../routes/*.js']
    }
    const swaggerDocs = swaggerjsDoc(swaggerOptions)
    app.get("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions))
    /**
     * @swagger
     * /api/newsletter/view
     *  get:
     *      description:"used to list all newsletter"
     */
}