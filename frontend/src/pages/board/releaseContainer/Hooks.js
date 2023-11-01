import { useState } from "react"

export const useRelease = () => {
    const [releaseList, setReleaseList] = useState([])

    const setDefaultRelease = (releases) => {
        setReleaseList((prevState) => (
            releases.map((release) => {
                return {
                    release: release,
                    isActive: false
                }
            }))
        )
    }

    const activateRelease = (release_arg) => {
        setReleaseList((prevState) => (
            prevState.map((release) => {
                if(release.release.id === release_arg.id){
                    return {
                        release: release.release,
                        isActive: true
                    }
                }else{
                    return {
                        release: release.release,
                        isActive: false
                    }
                }
            }))
        )
    }
    return {releaseList,setDefaultRelease,activateRelease}
}
