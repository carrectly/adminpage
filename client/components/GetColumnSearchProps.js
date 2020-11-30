import React from 'react'

const GetColumnSearchProps = dataIndex => {
	return {
		filterDropdown: function({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) {
			return (
				<div style={{padding: 8}}>
					<Input
						ref={node => {
							searchInput = node
						}}
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : []
							)
						}
						onPressEnter={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						style={{width: 188, marginBottom: 8, display: 'block'}}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() =>
								handleSearch(selectedKeys, confirm, dataIndex)
							}
							icon={<SearchOutlined />}
							size='small'
							style={{width: 90}}>
							Search
						</Button>
						<Button
							onClick={() => handleReset(clearFilters)}
							size='small'
							style={{width: 90}}>
							Reset
						</Button>
					</Space>
				</div>
			)
		},
	}
}

export default GetColumnSearchProps
