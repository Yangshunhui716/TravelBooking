function updateActive(url, isActiveValue) {
    if (confirm("Ban chac chan duyet khong?") === true) {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "is_active": isActiveValue.toString()
            })
        }).then(res => {
            if (res.ok)
                location.reload();
            else
                alert("He thong co loi! Vui long quay lai sau!");
        });
    }
}