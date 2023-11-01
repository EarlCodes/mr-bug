export const getParticipant = (props) => {
    let participant;
    if (props.conversation.participant_one.id === props.user.id) {
        participant = props.conversation.participant_two
    } else {
        participant = props.conversation.participant_one
    }
    return participant;
}

export const recentMessage = (props) => {
    var message = props.conversation.conversations[props.conversation.conversations.length - 1]
    return message
}

export const getTotalUnreadMessages = (conversation,user) => {
    var reads = 0
    conversation.conversations.map((convo) => {
        if (!convo.isRead & user.id !== convo.sender.id) {
            reads++
        }
    })
    return reads;
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
