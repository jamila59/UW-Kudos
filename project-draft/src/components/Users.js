import React, {useState} from 'react';
import _ from 'lodash';

function UserCard(props) {
    let url = '/page/' + props.user.email;
    return (
        <div class="container"> 
          <div className="card mb-3">
              <div className="card-body">
                  <h5 className="card-title">{props.user.username}</h5>
                  <p className="card-text">{props.user.email}</p>
                  <a href={url} className="btn btn-outline-success">View all User's Posts</a>
              </div>
          </div>
        </div> 

    )
}

export function Users(props) {
  const [sort, setSorted] = useState(null)
    console.log(props);
  function handleClick(event){
      let name = event.target.value;
      let nextSort;
      if(name === "asc"){
        nextSort = {sort: name}
      } else if( name === "desc"){
        nextSort = {sort: name}
      }
      setSorted(nextSort);
  }

  let sorted = _.sortBy(props.users, "email");

  if(sort != null && sort.sort === "desc"){
    _.reverse(sorted);
  }

    let userObj = sorted.map((user) => {
        return <UserCard key={user.username} user={user} />;
    });
    return (
        <main>
            <div className="container">
                <div className="filter">
                    <p>Sort-By:</p>
                    <button type="button" onClick={handleClick} name="asc" className="btn btn-outline-warning">Alphabetical (A-Z)</button>
                    <button type="button"  onClick={handleClick} name="desc" className="btn btn-outline-warning">Alphabetical (Z-A)</button>
                </div>
            </div>
            <section>
                {userObj}
            </section>
        </main>
    )
}
