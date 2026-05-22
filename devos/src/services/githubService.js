const username = "sperbtheo"

export async function getGithubData() {

    try {

        const userResponse = await fetch(
            `https://api.github.com/users/${username}`
        )

        const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos`
        )

        const user = await userResponse.json()
        const repos = await reposResponse.json()

        return {

            username: user.login,

            repositories: user.public_repos,

            followers: user.followers,

            avatar: user.avatar_url,

            recentActivity: repos
                .slice(0, 3)
                .map(repo => repo.name)

        }

    }

    catch (error) {

        console.error(
            "Erro Github:",
            error
        )

        return null

    }

}