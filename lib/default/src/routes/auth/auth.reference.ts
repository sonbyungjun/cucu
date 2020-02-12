/**
 * @swagger
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *     loginId:
 *       type: string
 *       description: Login ID
 *     password:
 *       type: string
 *       description: Passwords 8 to 13 characters
 *     name:
 *       type: string
 *       description: Name
 */

/**
 * @swagger
 * definitions:
 *  login:
 *    type: object
 *    required:
 *      - loginId
 *      - password
 *    properties:
 *      loginId:
 *        type: string
 *        description: Login ID
 *      password:
 *        type: string
 *        description: Passwords
 */
