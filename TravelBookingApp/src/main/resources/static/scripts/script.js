function updateActive(url, isActiveValue) {
    if (confirm("Vui long xac nhan dieu chinh trang thai hoat dong cua nha cung cap") === true) {
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