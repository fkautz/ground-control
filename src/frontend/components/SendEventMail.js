import React from 'react'
import Relay from 'react-relay'
import {SelectField, MenuItem, Dialog, FlatButton, TextField} from 'material-ui'
import MutationHandler from './MutationHandler'
import EmailHostAttendees from '../mutations/EmailHostAttendees'

class SendEventMail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target: 'host',
      bcc: [],
      subject: '',
      message: ''
    }
  }

  render() {
    const standardActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.handleCancel} />,
      <FlatButton
        label="Send Message"
        primary={true}
        disabled={false}
        onTouchTap={() => {
          console.log('submitting...')
          console.log(this.refs)
          this.refs.sendEmailHandler.send({
            ids: this.props.ids,
            ...this.state
          })
        }}
      />
    ]

    return (
      <Dialog
        title="Send Event Email"
        actions={standardActions}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <SelectField
          floatingLabelText="Send Email To"
          value={this.state.target}
          onChange={(event, index, value) => {
            this.setState({target: value})
          }}
          style={{width: '350px'}}
          floatingLabelStyle={{cursor: 'pointer'}}
        >
          <MenuItem value="host" primaryText="Event Host"/>
          <MenuItem value="attendees" primaryText="Event Attendees"/>
          <MenuItem value="hostAndAttendees" primaryText="Host and Attendees"/>
        </SelectField>
        <TextField
          floatingLabelText="From"
          value={'user@example.com'}
        />
        <TextField
          floatingLabelText="Subject"
          value={this.state.subject}
          onChange={(event, index, value) => {
            this.setState({subject: value})
          }}
          fullWidth={true}
        />
        <TextField
          floatingLabelText="Message Content"
          value={this.state.message}
          onChange={(event) => {
            this.setState({message: event.target.value});
          }}
          multiLine={true}
          rowsMax={11}
          fullWidth={true}
          inputStyle={{backgroundColor: 'rgb(250,250,250)'}}
          ref="message"
        />
        <MutationHandler
          ref='sendEmailHandler'
          mutationClass={EmailHostAttendees}
          mutationName='emailHostAttendees'
          successMessage='Message Sent.'
        />
      </Dialog>
    )
  }
}

export default Relay.createContainer(SendEventMail, {
  fragments: {
    currentUser: () => Relay.QL`
      fragment on User {
        email
      }
    `
  }
})