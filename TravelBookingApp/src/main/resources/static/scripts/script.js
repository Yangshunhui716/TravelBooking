function updateActive(url) {
    if (confirm("Ban chac chan duyet khong?") == true) {
        fetch(url, {
            method: 'post'
        }).then(res => {
            if (res.ok)
                location.reload();
            else
                alert("He thong co loi! Vui long quay lai sau!");
            
        });
    }
}