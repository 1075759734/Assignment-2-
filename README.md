# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## artifacture
No chat function required; create a dashboard;
The chat function requires real-time communication in different groups and channels;
- admin user：Some users have admin privileges to add other users to channels or groups
- super admin：able to manage this site
- use node.js/angular/sockets

Assignment1 does not require user authentication


## function
1. group admin
	- create groups
	- create/invite user to group
	- remove an user from group
	- allow a user to become a group assist of the group
2. super admin
	- create users with group super role
	- add/remove users in the group
	- can provide another user with super role
	- has groupAdmin role.
3. user
	- id: username
	- Initialization：one user called 'super' is Super-admin
	- email address

## implements
Registered user：http://localhost:4200/Register
Login user：http://localhost:4200/Login
Register group: http://localhost:4200/Register2
The default contains super user: the password is also super

- first page
	+ enter username，remembered in local storage
	+ logout： clears username out of local storage
- groups page
	+ Users log in and see the groups they have joined
- super-admin page
	+ input forms to add, delete user, group,
	+  A text box should allow a new message to be launched to the channel
	+ The new message can be broadcast to not all users (as1 not needed)
	+ data is stored in the serialising js object to the JSON string stored in the file system.

## Building a project
ng new my-app
cd my-app
ng serve --open

npm install bootstrap@next
npm install --save rxjs-compat

- - Login Page
	+ component component and corresponding template template
	+ ng generate component login
	+ ng generate component group
	+ ng generate component chat
- model
	+ ng generate class user-model # Generate a user-model.ts which is the UserModel class
	+ ng g cl models/user # Create models folder, user model
	+ ng generate service login-data # Generate a login-data.service.ts- service
	+ ng g service authentication
- localStorage
	+ Access：
		* localStorage.setItem('key', 'value');
		* localStorage.key = 'value'
		* const info = {name:'1', age:'2',};
		* sessionStorage.setItem('key', JSON.stringify(info));
	+ get：
		* var data1 = JSON.parse(localStorage.getItem('key'));
		* localStorage.key;
	+ delete：
		* localStorage.removeItem('key');
		* Remove all：	
			- sessionStorage.clear();
			- localStorage.clear();
