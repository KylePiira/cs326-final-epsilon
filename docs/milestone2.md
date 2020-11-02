# Part 0

## Data Types

* User (Hannah D)
  
  * `register` - create user account with username and password
    
    * `username` 
    
    * `password`
  
  * `login` - access a user account, return session token?
    
    * `username`
    
    * `password`
  
  * `delete` - removes a user from the system (admins only)
    
    * `username`
  
  * `edit` - edit a user (admins only)
    
    * `username`
    
    * `reputation`
    
    * `password`

* Stories (Hannah H)
  
  * `create`
    
    * `title`
    
    * `url`
    
    * `investment`
  
  * `read`
    
    * `id`
  
  * `delete`
    
    * `id`
  
  * `edit`
    
    * `id`
    
    * `title`
    
    * `url`
    
    * `investment`

* Comments (Hannah H)
  
  * `create`
    
    * `author`
    
    * `story`
    
    * `body`
  
  * `read`
    
    * `id`
  
  * `delete`
    
    * `id`
  
  * `edit`
    
    * `id`
    
    * `comment`

* Votes (Kyle)
  
  * `create`
    
    * `story` or `comment`
  
  * `delete`
    
    * `story` or `comment`

* Investments (Kyle)
  
  * `create`
    
    * `TICKER`
    
    * `url` (maybe)
  
  * `delete`
    
    * `id`
