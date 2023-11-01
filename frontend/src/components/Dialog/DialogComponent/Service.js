export const getParticipant = (props) => {
    let participant;
    if (props.conversation.participant_one.id === props.user.id) {
        participant = props.conversation.participant_two
    } else {
        participant = props.conversation.participant_one
    }
    return participant;
}

export const isSender = (message, user) => {
    let isSender = false
    if (message.sender.id === user.id) {
        isSender = true
    } else {
        isSender = false
    }
    return isSender
} 