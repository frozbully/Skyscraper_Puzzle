class Grid {

    constructor(n) {
        // nxn grid filled with -1 creation
        this.grid = new Array(n).fill().map(() => new Array(n).fill(-1));
        // n grid creation
        this.top = new Array(n).fill(0);
        this.right = new Array(n).fill(0);
        this.bottom = new Array(n).fill(0);
        this.left = new Array(n).fill(0);

        // test data
        /*this.top = [1, 2, 4, 2];
        this.right = [2, 3, 1, 2];
        this.bottom = [4, 2, 1, 2];
        this.left = [1, 2, 3, 3];*/
        this.top = [3, 3, 1, 2];
        this.right = [2, 1, 3, 4];
        this.bottom = [1, 2, 3, 3];
        this.left = [2, 2, 2, 2];

        this.dim = n;
    }

    // function called every frame (60 times/second)
    draw() {
        // grid
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                fill(255);
                rect(x * (TILE_SIZE + TILE_GAP) + MARGIN, y * (TILE_SIZE + TILE_GAP) + MARGIN, TILE_SIZE, TILE_SIZE);
                textAlign(CENTER);
                fill(0);
                textSize(18);
                text(this.grid[x][y] + 1, x * (TILE_SIZE + TILE_GAP) + MARGIN + 20, y * (TILE_SIZE + TILE_GAP) + MARGIN + 24);
            }
        }
        // instructions on the side of the grid
        for (let i = 0; i < this.dim; i++) {
            fill(255);
            text(this.left[i],
                MARGIN - 20,
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 25);
            text(this.right[i],
                MARGIN + 15 + this.dim * (TILE_SIZE + TILE_GAP),
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 25);
            text(this.top[i],
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 20,
                MARGIN - 20
            );
            text(this.bottom[i],
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 20,
                MARGIN + 20 + this.dim * (TILE_SIZE + TILE_GAP)
            );
        }
    }

    // event when the canvas is clicked
    mouse_event(mx, my) {
        // if a tile if clicked, we increase its value
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                let rx = x * (TILE_SIZE + TILE_GAP) + MARGIN;
                let ry = y * (TILE_SIZE + TILE_GAP) + MARGIN;
                if (mx >= rx && mx <= rx + TILE_SIZE && my >= ry && my <= ry + TILE_SIZE) {
                    this.grid[x][y]++;
                    // value of the tile cannot be greater than n
                    this.grid[x][y] = this.grid[x][y] % this.dim;
                }
            }
        }
    }

    check()
    {
        return check(grid.grid, grid.top, grid.bottom, grid.left, grid.right, grid.dim);
    }

    solve()
    {
        //console.log(solve(this.grid, this.top, this.bottom, this.left, this.right, this.dim));
        for (let _ = 0; _ < 10; _++)
            this.grid = solve(this.grid, this.top, this.bottom, this.left, this.right, this.dim);
    }

}

function solve(grid, top, bottom, left, right, dim)
{
    // fill known cases to reduce brute force options
    fill_grid(grid, top, bottom, dim);
    if (is_full(grid, dim))
    {
        if (check(grid, top, bottom, left, right, dim))
        {
            return grid;
        }
        return null;
    }
    let next_case = next_empty_case(grid, dim);
    for (let i = 0; i < 4; i++)
    {
        let grid_cpy = copy_grid(grid, dim);

        grid_cpy[next_case[0]][next_case[1]] = i;
        if (solve(grid_cpy, top, bottom, left, right, dim) != null)
            return grid_cpy;
    }
}

function is_full(grid, dim) {
    for (let x = 0; x < dim; x++)
    {
        for (let y = 0; y < dim; y++)
        {
            if (grid[x][y] == -1)
                return false;
        }
    }
    return true;
}

function check(grid, top, bottom, left, right, dim) {
    for (let x = 0; x < dim; x++)
    {
        if (!check_top(grid[x], top[x], dim))
            return false;
        if (!check_bottom(grid[x], bottom[x], dim))
            return false;
    }
    if (!check_left(grid, left, dim))
        return false;
    if (!check_right(grid, right, dim))
        return false;
    return true;
}

function check_top(row, target, dim) {
    let max = -1;
    let max_changed = 0;
    for (let y = 0; y < dim; y++)
    {
        if (row[y] < 0)
            return true;
        if (row[y] > max)
        {
            max = row[y];
            max_changed++;
        }
    }
    if (new Set(row).size != row.length)
        return false;
    return (max_changed == target);
}

function check_bottom(row, target, dim) {
    let max = -1;
    let max_changed = 0;
    for (let y = dim - 1; y >= 0; y--)
    {
        if (row[y] < 0)
            return true;
        if (row[y] > max)
        {
            max = row[y];
            max_changed++;
        }
    }
    if (new Set(row).size != row.length)
        return false;
    return (max_changed == target);
}

function check_left(grid, target, dim) {
    for (let y = 0; y < dim; y++)
    {
        let arr = [];
        for (let x = 0; x < dim; x++)
            arr.push(grid[x][y]);
        if (!check_top(arr, target[y], dim))
            return false;
    }
    return true;
}

function check_right(grid, target, dim) {
    for (let y = 0; y < dim; y++)
    {
        let arr = [];
        for (let x = 0; x < dim; x++)
            arr.push(grid[x][y]);
        if (!check_bottom(arr, target[y], dim))
            return false;
    }
    return true;
}

function next_empty_case(grid, dim)
{
    for (let x = 0; x < dim; x++)
    {
        for (let y = 0; y < dim; y++)
        {
            if (grid[x][y] < 0)
                return [x, y];
        }
    }
    return undefined;
}

function copy_grid(grid, dim)
{
    let arr = new Array(dim).fill().map(() => new Array(dim).fill(-1));
    for (let x = 0; x < dim; x++)
    {
        for (let y = 0; y < dim; y++)
            arr[x][y] = grid[x][y];
    }
    return arr;
}

function fill_grid(grid, top, bottom, dim)
{
    for (let x = 0; x < dim; x++)
    {
        if (top[x] == dim)
        {
            for (let i = 0; i < dim; i++)
                grid[x][i] = i;
        }
        if (bottom[x] == 4)
        {
            for (let i = 0; i < dim; i++)
                grid[x][i] = dim - i - 1;
        }

        fill_missing(grid[x], dim);
        fill_missing_columns(grid, dim);
    }
}

function fill_missing(row, dim)
{
    let count = 0;
    let last_y = -1;
    for (let y = 0; y < dim; y++)
    {
        if (row[y] < 0)
        {
            count++;
            last_y = y;
        }
    }
    if (count == 1)
    {
        for (let i = 0; i < dim; i++)
        {
            if (row.indexOf(i) < 0)
            {
                row[last_y] = i;
                return;
            }
        }
    }
}

function fill_missing_columns(grid, dim)
{
    for (let y = 0; y < dim; y++)
    {
        let arr = [];
        for (let x = 0; x < dim; x++)
            arr.push(grid[x][y]);
        fill_missing(arr, dim);
        for (let x = 0; x < dim; x++)
            grid[x][y] = arr[x];
    }
}
