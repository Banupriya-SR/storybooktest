export const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    return response
}

export const updateUsers =
    async (data) => {
        console.log("here")
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${data.id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
        return response;
    }


export const addUsers = async (data) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    return response;
}

export const deleteUsers =
    async (data, userState) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${data.id}`,
            {
                method: "Delete",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data;
            });
        if (response) {
            const objIndex =
                userState &&
                userState.findIndex((obj) => obj.id == data.id);
            userState.splice(objIndex, 1)
        }

        return userState;
    }
