# Capitall Assignment 📝

The website is hosted on: [Click here!](https://rebuy-7e8ad.web.app/)
The backend is hosted on: [Click here!](https://capitall-assignment.herokuapp.com/)

rebuy/
┣ backend/
┗ frontend/


For Frontend:
1. Clone the code from the repository using `git clone`
2. Locate the folder in terminal and run `npm install` to install required dependecies
3. To start the website locally, run command `npm start`

For Backend:
1. Clone the code from the repository using `git clone`
2. Locate the folder in terminal and run `npm install` to install required dependecies
3. To start the backend server locally on the device, run command `npm start`
4. To request the api for data use the following urls,

```json
{
	"info": {
		"_postman_id": "83fe30b0-2b73-45d6-871f-fd183d670556",
		"name": "Assignment_Collection",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Authentication",
			"item": [
				{
					"name": "Signup a User",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"pm.environment.set(\"jwt\", pm.response.json().token);"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Ravi Singh\",\r\n    \"email\": \"ravi@gmail.com\",\r\n    \"password\": \"test123\"\r\n}"
						},
						"url": {
							"raw": "{{URL}}api/auth/signup",
							"host": [
								"{{URL}}api"
							],
							"path": [
								"auth",
								"signup"
							]
						},
						"description": "This endpoint can be used to register a user. The body should contain name, email and password of the user."
					},
					"response": []
				},
				{
					"name": "Login a User",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"pm.environment.set(\"jwt\", pm.response.json().token);"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"ravi@gmail.com\",\r\n    \"password\": \"test123\"\r\n}"
						},
						"url": {
							"raw": "{{URL}}api/auth/login",
							"host": [
								"{{URL}}api"
							],
							"path": [
								"auth",
								"login"
							]
						},
						"description": "This endpoint is used to authenticate the user with email and password passed as body of the request."
					},
					"response": []
				},
				{
					"name": "Validtate User Login",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer {{jwt}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{URL}}api/auth/validateToken",
							"host": [
								"{{URL}}api"
							],
							"path": [
								"auth",
								"validateToken"
							]
						},
						"description": "This endpoint is used to validate the token stored in the browser's local storage. The request should be passed with an Authorization header with bearer token."
					},
					"response": []
				},
				{
					"name": "Get Me",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{jwt}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{URL}}api/auth/getMe",
							"host": [
								"{{URL}}api"
							],
							"path": [
								"auth",
								"getMe"
							]
						}
					},
					"response": []
				}
			],
			"description": "Endpoint for authentication of the user."
		},
		{
			"name": "Products",
			"item": [
				{
					"name": "Sell",
					"item": [
						{
							"name": "Create Product",
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Bearer {{jwt}}",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"nameOfTheItem\": \"Bajaj Pulsar 150 2021 Model\",\r\n    \"category\": \"vehicle\",\r\n    \"priceListed\": \"75000\",\r\n    \"pictureOfItem\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkx3B4XONxkg2-uVcbGXtJfKxxelvNr4MpYA&usqp=CAU\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{URL}}api/product/sell",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"sell"
									]
								}
							},
							"response": []
						},
						{
							"name": "Get Products",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{jwt}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [],
								"url": {
									"raw": "{{URL}}api/product/sell",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"sell"
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Buy",
					"item": [
						{
							"name": "Get Products",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "{{URL}}api/product/browse",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"browse"
									]
								}
							},
							"response": []
						},
						{
							"name": "Get a Product",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "{{URL}}api/product/browse/61bcf52b5a2455494878aa3c",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"browse",
										"61bcf52b5a2455494878aa3c"
									]
								}
							},
							"response": []
						},
						{
							"name": "Buy a Product",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{jwt}}",
											"type": "string"
										}
									]
								},
								"method": "PATCH",
								"header": [],
								"url": {
									"raw": "{{URL}}api/product/buy/61bcf52b5a2455494878aa3c",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"buy",
										"61bcf52b5a2455494878aa3c"
									]
								}
							},
							"response": []
						},
						{
							"name": "Get Purchased Products",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{jwt}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [],
								"url": {
									"raw": "{{URL}}api/product/buy",
									"host": [
										"{{URL}}api"
									],
									"path": [
										"product",
										"buy"
									]
								}
							},
							"response": []
						}
					]
				}
			],
			"description": "Endpoints for buying, selling and browsing products available on the website."
		}
	]
}
```
