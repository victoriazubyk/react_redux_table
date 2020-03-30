import React from 'react';
import { connect } from 'react-redux'
import './App.css';

import MaterialTable from 'material-table';

function App(props) {
  const [state] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Score', field: 'score', type: 'numeric' }
    ]
  });
  
  return (
    <div className="container">
      <MaterialTable
        title="Users list"
        columns={state.columns}
        data={props.userList}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
                resolve();
                props.onAdd(newData);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                resolve();
                const updatedUser = {...oldData, ...newData}
                props.onUpdate(updatedUser);
            }),
          onRowDelete: (oldData) =>          
            new Promise((resolve) => {
                resolve();
                props.onDelete(oldData);
            }),
        }}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userList: state.userList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: (newUser) => dispatch({type: 'ADD', payload: newUser}),
    onDelete: (deletedUser) => dispatch({type: 'DELETE', payload: deletedUser}),
    onUpdate: (updatedUser) => dispatch({type: 'UPDATE', payload: updatedUser}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
