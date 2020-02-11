/**
 * @swagger
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *     loginId:
 *       type: string
 *       description: 로그인 ID
 *     password:
 *       type: string
 *       description: 패스워드 8 ~ 13자
 *     name:
 *       type: string
 *       description: 이름 또는 닉네임
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
 *        description: 로그인
 *      password:
 *        type: string
 *        description: 패스워드
 */
